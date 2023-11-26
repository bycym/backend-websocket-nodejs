import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import WebSocket from 'ws';
import 'dotenv/config'
import { v4 as uuid } from 'uuid';

export type BoatInfo = {
  id: string // UUID
  name: string
}
const BOATINFO = {
  // id: 'AECA6542-ECB2-4D58-B906-D2435F9B249E', //uuid(),
  name: 'csobanka'
} as BoatInfo;

const serverUrl = `ws://${process.env.SERVER_ADDRESS}:${process.env.BACKEND_PORT}/ws?name${BOATINFO.name}`;
const directoryPath = 'mocked-streamer/lines';
const FREQUENCY: number = 1000 // 1 Hz
const DATA_REGEX = /^\d{0,3}\.\d*,\d{0,3}\.\d*,\d{0,3}\.\d*$/

async function wait(freq: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, freq));
}

const readLinesFromFile = async (filePath: string): Promise<string[]> => {
  const lines: string[] = [];
  try {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    for await (const line of rl) {
      lines.push(line);
    }
  } catch (e) {
    console.log(e)
  }
  return lines;
};

const readContentFromDirectory = async (directory: string): Promise<string[]> => {
  const fileNames = await fs.promises.readdir(directoryPath);
  const data = await Promise.all(
    fileNames.flatMap(async (fileName) => {
      const filePath = path.join(directoryPath, fileName);
      const dataFromFile = await readLinesFromFile(filePath);
      return dataFromFile;
    }).flatMap(innerArray => innerArray)
  );
  return await data.flatMap(innerArray => innerArray).filter((data)=>DATA_REGEX.test(data))
};

const run = async (): Promise<void> => {
  let ws: WebSocket;
  ws = new WebSocket(serverUrl);
  // Wait for the WebSocket connection to be established
  await new Promise<void>((resolve) => {
    ws.on('open', resolve);
  });

  const dataArray = await readContentFromDirectory(directoryPath)
  for(const data in dataArray) {
    const row = dataArray[data]
    if(row.split(',').length !== 3) throw new Error(`Issue with data: ${row}`)
    const position = row.split(',')
    const newData = {
      latitude: position[0],
      longitude: position[1],
      heading: position[2]
    }
    const jsonData = JSON.stringify(newData);
    console.log(`Send ${jsonData} data. ${Date()}`)
    ws.send(jsonData);
    await wait(FREQUENCY)
  }
  ws.close();
}

run()
  .then(()=> {
    console.log('Messages sent out.')
  })
  .catch(error => console.log(error))
import archiver = require("archiver");
import * as fs from "fs";
import * as path from "path";
import { Config } from "../config";

const backuppath = path.resolve(Config.dataPath(), "../backup.zip");

import TelegramBot = require("node-telegram-bot-api");
import { BackupData } from "./BackupData";
import { Sleep } from "../util/Sleep";
import { IntervalsExecution } from "../util/IntervalsExecution";

let data = new BackupData();

const datafilepath = path.resolve(Config.dataPath(), "backup.json");
const daysbetweenbackups = 2;
const whattimeofaday = 22;

export async function InitBackup()
{
  if (fs.existsSync(datafilepath)) {
    const file = fs.readFileSync(datafilepath);

    data = JSON.parse(file.toString()) as BackupData;

    console.log(`Read backup data.`);
  }
  else {
    console.log(`Created new datafile for backups.`);
    BackupSave();
  }
}

export async function BackupSave()
{
  const tdata = JSON.stringify(data);
  fs.writeFileSync(datafilepath, tdata);
}

export async function BackupCycle()
{
  const now = new Date(Date.now());
  const executed = await IntervalsExecution.Executed("backup");

  if (!executed && Math.abs(data.lastSend - now.getDate()) > daysbetweenbackups && now.getHours() >= whattimeofaday) {
    console.log(now + " backup time");
    CreateBackup();
    IntervalsExecution.Execute("backup");
  }
}

async function CreateBackup()
{
  const now = new Date(Date.now());
  data.lastSend = now.getDate();

  await MakeBackupArchive();

  BackupSave();
}

async function MakeBackupArchive()
{
  const output = fs.createWriteStream(backuppath);
  const archive = archiver("zip");

  output.on("close", () =>
  {
    console.log(archive.pointer() + " total bytes");
  });

  archive.on("error", (err) =>
  {
    throw err;
  });

  archive.pipe(output);

  // append files from a directories into the archive
  archive.directory(Config.dataPath(), "data");
  archive.directory(path.resolve(Config.dataPath(), "../diary"), "diary");

  await archive.finalize();
}

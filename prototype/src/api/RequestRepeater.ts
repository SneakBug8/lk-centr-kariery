import { Sleep } from "../util/Sleep";

export async function RequestRepeater<T>(fun: () => Promise<T>, backup: T, tries = 5): Promise<T>
{
  if (!backup) {
    (backup as any) = {};
  }
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fun();
      return r;
    }
    catch (e) {
      console.error(`RequestRepeater${i} - ` + e);
      await Sleep(200);
    }
  }

  return backup;
}
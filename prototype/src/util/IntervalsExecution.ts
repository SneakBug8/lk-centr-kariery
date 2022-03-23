import { Connection } from "../Database";
import { MIS_DT } from "../util/MIS_DT";

export class IntervalsExecution
{
  public MIS_DT = MIS_DT.GetHour();
  public flag = "";

  public static async Executed(flag: string = "")
  {
    const h = MIS_DT.GetHour();
    const d = await IntervalsExecutionsRepository().where("MIS_DT", h).andWhere("flag", flag).select();
    return d.length > 0;
  }

  public static async Execute(flag: string = "")
  {
    const e = new IntervalsExecution();
    e.MIS_DT = MIS_DT.GetHour();
    e.flag = flag;
    await IntervalsExecutionsRepository().where("MIS_DT", "<", MIS_DT.GetDay() - MIS_DT.OneDay() * 30).delete();
    return await IntervalsExecutionsRepository().insert(e);
  }
}
export const IntervalsExecutionsRepository = () => Connection<IntervalsExecution>("IntervalsExecutions");

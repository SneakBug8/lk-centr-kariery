import { WebApi } from "../api/web";

class CareerClass
{
  public Init()
  {
    WebApi.app.get("/", (req, res) => res.render("index"));
    WebApi.app.get("/jobs", (req, res) => res.render("jobs"));
    WebApi.app.get("/company", (req, res) => res.render("company"));
  }
}

export const Career = new CareerClass();

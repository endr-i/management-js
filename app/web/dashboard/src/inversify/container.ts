import { Container } from "inversify";
import { HttpService } from "../service/http.service";

export const diContainer = new Container();
diContainer.bind<HttpService>(HttpService).toSelf();

import {Container} from "inversify";
import { BookService } from "../services/BookService";

const container = new Container();
container.bind(BookService).toSelf();

export default container;

//import { writeToFile } from "../fileManager/fileManager";
import moment from "moment";

const logRepositoryPath =  "../../logs";

export function log(data){
    let logFileTitle = moment().format('YYYY-MM-DD [(]HH:mm[)]');
    let logtext = `${logFileTitle}: ${data}`;

    console.log(logtext);
    //writeToFile(`${logRepositoryPath}/${logFileTitle}`, logtext);
}
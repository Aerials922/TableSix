import connection from "../config/mysql.js";
import * as financialService from '../service/financialSercive.js';
const TslaResponse = await axios.get("https://c4rm9elh30.execute-api.us-east-1.amazonaws.com/default/cachedPriceData?ticker=TSLA");
const TslaData = TslaResponse.data;
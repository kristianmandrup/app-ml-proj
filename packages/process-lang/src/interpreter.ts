import { parser } from "./parser";

export const interpreter = parser.getBaseCstVisitorConstructor();

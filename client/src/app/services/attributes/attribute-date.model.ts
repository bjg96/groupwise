import { Serializable } from "../../shared/serializable";

export class AttributeDate extends Serializable {
  "Id": number;
  "Name": string;
  "Description": string;
  "Question": string;
  "ForType": "STUDENT" | "HOST" | "BOTH";
  "MinDate": string;
  "MaxDate": string;
  "Required": boolean;
  "createdAt": string;
  "updatedAt": string;
}

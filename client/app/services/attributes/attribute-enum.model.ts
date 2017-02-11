import { Serializable } from "../../shared/serializable";

export class Enum {
  "Value": string;
  "Display": string;
}

export class AttributeEnum extends Serializable {
  "Id": number;
  "Name": string;
  "Description": string;
  "ForType": "STUDENT" | "HOST" | "BOTH";
  "MaxSelect": number;
  "MinSelect": number;
  "Options": Enum[];
  "SelectType": "DROPDOWN" | "RADIO";
  "createdAt": string;
  "updatedAt": string;
}
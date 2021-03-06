import {Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import {Attribute} from "../../services/attributes/attribute.model";
import {AttributeService} from "../../services/attributes/attribute.service";
import {ModalDirective} from "ngx-bootstrap";
import {AttributeString} from "../../services/attributes/attribute-string.model";
import {AttributeDate} from "../../services/attributes/attribute-date.model";
import {AttributeRange} from "../../services/attributes/attribute-range.model";
import {AttributeEnum, Enum} from "../../services/attributes/attribute-enum.model";
import * as _ from 'lodash';

class AttributeView {
  Name: string;
  Description: string;
  Question: string;
  Type: string;
  ForType: "STUDENT" | "HOST" | "BOTH";
  StringMaxLen: number;
  DateMin: string;
  DateMax: string;
  SelectMax: number;
  SelectMin: number;
  RangeMin: number;
  RangeMax: number;
  isInt: boolean;
  Required: boolean;
  ExistingAttribute: Attribute = null;
  EnumOptions: Enum[] = [];
  SelectType: "DROPDOWN" | "RADIO";
}

@Component({
  selector: 'app-admin-attributes',
  templateUrl: 'admin-attributes.component.html',
  styleUrls: ['admin-attributes.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class AdminAttributesComponent implements OnInit {
  @ViewChild('attributeEditModal') public attributeEditModal:ModalDirective;
  private attributes: Attribute[] = [];
  private editingAttribute: AttributeView = new AttributeView();
  private isLoading: boolean;

  constructor(private attributeService: AttributeService) { }

  ngOnInit() {
    this.isLoading = true;
    this.attributeService.getAllAttributes()
      .subscribe(attributes => {
        this.isLoading = false;
        this.attributes = attributes;
      });
  }

  addAttribute() {
    this.editingAttribute = new AttributeView();
    this.attributeEditModal.show();
  }

  private guid(): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  editAttribute(attribute: Attribute) {
    this.setEditingAttribute(attribute);

    this.attributeEditModal.show();
  }

  setEditingAttribute(attribute: Attribute) {
    this.editingAttribute = new AttributeView();

    this.editingAttribute.ExistingAttribute = attribute;
    this.editingAttribute.Name = attribute.Type.Name;
    this.editingAttribute.ForType = attribute.Type.ForType;
    this.editingAttribute.Question = attribute.Type.Question;
    this.editingAttribute.Description = attribute.Type.Description;
    this.editingAttribute.Type = this.attributeService.getAttributeType(attribute);
    this.editingAttribute.Required = attribute.Type.Required;

    switch (this.editingAttribute.Type) {
      case 'STRING':
        this.editingAttribute.StringMaxLen = attribute.Type.MaxLength;
        break;
      case 'DATE':
        this.editingAttribute.DateMax = attribute.Type.MaxDate;
        this.editingAttribute.DateMin = attribute.Type.MinDate;
        break;
      case 'ENUM':
        this.editingAttribute.EnumOptions = _.cloneDeep(attribute.Type.Options);
        this.editingAttribute.SelectType = attribute.Type.SelectType;
        this.editingAttribute.SelectMax = attribute.Type.MaxSelect;
        this.editingAttribute.SelectMin = attribute.Type.MinSelect;
        break;
      case 'RANGE':
        this.editingAttribute.RangeMin = attribute.Type.Min;
        this.editingAttribute.RangeMax = attribute.Type.Max;
        this.editingAttribute.isInt = attribute.Type.isInt;
        break;
    }
  }

  deleteAttribute(attribute: Attribute) {
    let type = this.attributeService.getAttributeType(attribute);

    switch (type) {
      case 'STRING':
        this.attributeService.deleteAttributeString(attribute.Type)
          .subscribe(() => {
            this.attributes.splice(this.attributes.indexOf(attribute), 1);
          });
        break;
      case 'DATE':
        this.attributeService.deleteAttributeDate(attribute.Type)
          .subscribe(() => {
            this.attributes.splice(this.attributes.indexOf(attribute), 1);
          });
        break;
      case 'ENUM':
        this.attributeService.deleteAttributeEnum(attribute.Type)
          .subscribe(() => {
            this.attributes.splice(this.attributes.indexOf(attribute), 1);
          });
        break;
      case 'RANGE':
        this.attributeService.deleteAttributeRange(attribute.Type)
          .subscribe(() => {
            this.attributes.splice(this.attributes.indexOf(attribute), 1);
          });
        break;
    }
  }

  submitAttribute() {
    let isNew = this.editingAttribute.ExistingAttribute == null;

    switch (this.editingAttribute.Type) {
      case 'STRING':
        let attributeString = new AttributeString();

        if (!isNew)
          attributeString = this.editingAttribute.ExistingAttribute.Type;

        attributeString.Name = this.editingAttribute.Name;
        attributeString.Question = this.editingAttribute.Question;
        attributeString.Description = this.editingAttribute.Description;
        attributeString.ForType = this.editingAttribute.ForType;
        attributeString.MaxLength = this.editingAttribute.StringMaxLen;
        attributeString.Required = this.editingAttribute.Required;

        if (isNew) {
          this.attributeService.createAttributeString(attributeString)
            .subscribe((attributeString) => {
              this.attributes.push(this.attributeService.mapToAttribute(attributeString)[0]);
              this.attributeEditModal.hide();
            })
        }
        else {
          this.attributeService.updateAttributeString(attributeString)
            .subscribe((attributeString) => {
              this.attributeEditModal.hide();
            })
        }
        break;
      case 'DATE':
        let attributeDate = new AttributeDate();

        if (!isNew)
          attributeDate = this.editingAttribute.ExistingAttribute.Type;

        attributeDate.Name = this.editingAttribute.Name;
        attributeDate.Question = this.editingAttribute.Question;
        attributeDate.Description = this.editingAttribute.Description;
        attributeDate.ForType = this.editingAttribute.ForType;
        attributeDate.MaxDate = this.editingAttribute.DateMax;
        attributeDate.MinDate = this.editingAttribute.DateMin;
        attributeDate.Required = this.editingAttribute.Required;

        if (isNew) {
          this.attributeService.createAttributeDate(attributeDate)
            .subscribe((attributeDate) => {
              this.attributes.push(this.attributeService.mapToAttribute(attributeDate)[0]);
              this.attributeEditModal.hide();
            })
        }
        else {
          this.attributeService.updateAttributeDate(attributeDate)
            .subscribe((attributeDate) => {
              this.attributeEditModal.hide();
            })
        }
        break;
      case 'ENUM':
        let attributeEnum = new AttributeEnum();

        if (!isNew)
          attributeEnum = this.editingAttribute.ExistingAttribute.Type;

        attributeEnum.Name = this.editingAttribute.Name;
        attributeEnum.Question = this.editingAttribute.Question;
        attributeEnum.Description = this.editingAttribute.Description;
        attributeEnum.ForType = this.editingAttribute.ForType;
        attributeEnum.Options = this.editingAttribute.EnumOptions;
        attributeEnum.SelectType = this.editingAttribute.SelectType;
        attributeEnum.MaxSelect = this.editingAttribute.SelectMax;
        attributeEnum.MinSelect = this.editingAttribute.SelectMax;
        attributeEnum.Required = this.editingAttribute.Required;


        if (isNew) {
          this.attributeService.createAttributeEnum(attributeEnum)
            .subscribe((attributeEnum) => {
              this.attributes.push(this.attributeService.mapToAttribute(attributeEnum)[0]);
              this.attributeEditModal.hide();
            })
        }
        else {
          this.attributeService.updateAttributeEnum(attributeEnum)
            .subscribe((attributeEnum) => {
              this.attributeEditModal.hide();
            })
        }
        break;
      case 'RANGE':
        let attributeRange = new AttributeRange();

        if (!isNew)
          attributeRange = this.editingAttribute.ExistingAttribute.Type;

        attributeRange.Name = this.editingAttribute.Name;
        attributeRange.Question = this.editingAttribute.Question;
        attributeRange.Description = this.editingAttribute.Description;
        attributeRange.ForType = this.editingAttribute.ForType;
        attributeRange.Min = this.editingAttribute.RangeMin;
        attributeRange.Max = this.editingAttribute.RangeMax;
        attributeRange.isInt = this.editingAttribute.isInt;
        attributeRange.Required = this.editingAttribute.Required;

        if (isNew) {
          this.attributeService.createAttributeRange(attributeRange)
            .subscribe((attributeRange) => {
              this.attributes.push(this.attributeService.mapToAttribute(attributeRange)[0]);
              this.attributeEditModal.hide();
            })
        }
        else {
          this.attributeService.updateAttributeRange(attributeRange)
            .subscribe((attributeRange) => {
              this.attributeEditModal.hide();
            })
        }
        break;
    }
  }

  resetEditingAttribute() {
    if (this.editingAttribute.ExistingAttribute != null)
      this.setEditingAttribute(this.editingAttribute.ExistingAttribute);
    else
      this.editingAttribute = new AttributeView();
  }

  addEnumOption(){
    let newEnum = new Enum();
    newEnum.Value = this.guid();
    newEnum.Display = "";
    this.editingAttribute.EnumOptions.push(newEnum);
  }

  deleteEnum(option) {
    this.editingAttribute.EnumOptions.splice(this.editingAttribute.EnumOptions.indexOf(option), 1);
  }
}

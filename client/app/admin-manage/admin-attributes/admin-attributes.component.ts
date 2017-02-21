import {Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import {Attribute} from "../../services/attributes/attribute.model";
import {AttributeService} from "../../services/attributes/attribute.service";
import {ModalDirective} from "ng2-bootstrap";
import {AttributeString} from "../../services/attributes/attribute-string.model";
import {AttributeDate} from "../../services/attributes/attribute-date.model";
import {AttributeRange} from "../../services/attributes/attribute-range.model";
import {AttributeEnum} from "../../services/attributes/attribute-enum.model";

class AttributeView {
  Name: string;
  Description: string;
  Type: string;
  ForType: "STUDENT" | "HOST" | "BOTH";
  StringMaxLen: number;
  MinDate: string;
  MaxDate: string;
  MaxSelect: number;
  MinSelect: number;
  Min: number;
  Max: number;
  isInt: boolean;
  ExistingAttribute: Attribute = null;
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

  constructor(private attributeService: AttributeService) { }

  ngOnInit() {
    this.attributeService.getAllAttributes()
      .subscribe(attributes => {
        this.attributes = attributes;
      });
  }

  addAttribute() {
    this.editingAttribute = new AttributeView();
    this.attributeEditModal.show();
  }

  private getAttributeType(attribute: Attribute) {
    if (attribute.Type instanceof AttributeString)
      return "STRING";

    if (attribute.Type instanceof AttributeDate)
      return "DATE";

    if (attribute.Type instanceof AttributeRange)
      return "RANGE";

    if (attribute.Type instanceof AttributeEnum)
      return "ENUM";

    return null;
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
    this.editingAttribute.Description = attribute.Type.Description;
    this.editingAttribute.Type = this.getAttributeType(attribute);

    switch (this.editingAttribute.Type) {
      case 'STRING':
        this.editingAttribute.StringMaxLen = attribute.Type.MaxLength;
        break;
      case 'DATE':
        this.editingAttribute.MaxDate = attribute.Type.MaxDate;
        this.editingAttribute.MinDate = attribute.Type.MinDate;
        break;
      case 'ENUM':
        this.editingAttribute.MaxSelect= attribute.Type.MaxSelect;
        this.editingAttribute.MinSelect = attribute.Type.MinSelect;
        //Need to do Options and type too!
        break;
      case 'RANGE':
        this.editingAttribute.Min= attribute.Type.Min;
        this.editingAttribute.Max = attribute.Type.Max;
        this.editingAttribute.isInt = attribute.Type.isInt;
        break;
    }
  }

  deleteAttribute(attribute: Attribute) {
    let type = this.getAttributeType(attribute);

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
        attributeString.Description = this.editingAttribute.Description;
        attributeString.ForType = this.editingAttribute.ForType;
        attributeString.MaxLength = this.editingAttribute.StringMaxLen;

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
        attributeDate.Description = this.editingAttribute.Description;
        attributeDate.ForType = this.editingAttribute.ForType;
        attributeDate.MaxDate = this.editingAttribute.MaxDate;
        attributeDate.MinDate = this.editingAttribute.MinDate;

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
        attributeEnum.Description = this.editingAttribute.Description;
        attributeEnum.ForType = this.editingAttribute.ForType;
        attributeEnum.MaxSelect = this.editingAttribute.MaxSelect;
        attributeEnum.MinSelect = this.editingAttribute.MinSelect;

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
        attributeRange.Description = this.editingAttribute.Description;
        attributeRange.ForType = this.editingAttribute.ForType;
        attributeRange.Min = this.editingAttribute.Min;
        attributeRange.Max = this.editingAttribute.Max;

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

}

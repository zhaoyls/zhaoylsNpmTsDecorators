// import 'reflect-metadata'
interface FormFieldConfig {
  name: string;
  type: string;
  isRequired: boolean;
  isHidden: boolean;
}

// 唯一的键值，用于存储一个类的元数据。
const FORM_FIELDS_METADATA_KEY = Symbol("formFields");
function FormField(config: FormFieldConfig) {
  /**
   * [nodemon] starting `ts-node ./src/index.ts`
    { name: 'username', type: 'text' }
    { name: 'password', type: 'password' }
    { name: 'email', type: 'email' }
   */
  // console.log(config);
  return function (target: Object, propertyKey: string | symbol) {
    // 获取目标类的元数据数组
    // target.prototype[FORM_FIELDS_METADATA_KEY];
    const fields = Reflect.getMetadata(FORM_FIELDS_METADATA_KEY, target) || [];
    // 重新附加到目标类上。
    fields.push({ ...config, name: propertyKey });
       // target.prototype[FORM_FIELDS_METADATA_KEY] = fields;
    Reflect.defineMetadata(FORM_FIELDS_METADATA_KEY, fields, target);
  };
}

class FormModel {
  @FormField({ name: "username", type: "text", isRequired: true, isHidden: false })
  private username: string = "";

  @FormField({ name: "password", type: "password", isRequired: true,  isHidden: false })
  private password: string = "";

  @FormField({ name: "checkCode", type: "inputText", isRequired: true,  isHidden: false })
  private checkCode: string = "";

  public constructor() {
    this.resetField()
  }

  /**
   * 使用反射将表单数据重置
   */
  public resetField() {
    const fields = Reflect.getMetadata(
      FORM_FIELDS_METADATA_KEY,
      this
    ) as FormFieldConfig[];
    for (const field of fields) {
      this[field.name] = "";
    }
  }
  /**
   * 使用反射将表单数据保存到对象中
   * @param formData 
   */
  public saveFormData(formData: Record<string, any>) {
    const fields = Reflect.getMetadata(
      FORM_FIELDS_METADATA_KEY,
      this
    ) as FormFieldConfig[];
    for (const field of fields) {
      this[field.name] = formData[field.name] || "";
    }
  }

  /**
   * 使用反射将表单数据从对象中提取出来
   * @returns {formData}
   */
  public getFormData(): Record<string, any> {
    const formData: Record<string, any> = {};
    const fields = Reflect.getMetadata(
      FORM_FIELDS_METADATA_KEY,
      this
    ) as FormFieldConfig[];
    for (const field of fields) {
      formData[field.name] = this[field.name];
    }
    return formData;
  }

  /**
   * 检查对应的字段是否为空
   * 更多校验可使用 'class-validator' 注解库，或者自定义装饰器，反射区处理。
   * 验证参考于掘金： https://juejin.cn/post/7076701579222450190
   * @returns {boolean}
   */
  public checkFormData(): boolean {
    const fields = Reflect.getMetadata(
      FORM_FIELDS_METADATA_KEY,
      this
    ) as FormFieldConfig[];
    for (const field of fields) {
      const value = this[field.name];
      if (!value && field.isRequired && !field.isHidden) {
        console.log(field.name + value + "不能为空");
        return false;
      }
    }
    return true;
  }

  /**
   * @FormField 每一项组成的列表
   * @returns {FormFieldConfig[]}
   */
  public getFormConfig(): FormFieldConfig[] {
    const fields = Reflect.getMetadata(
      FORM_FIELDS_METADATA_KEY,
      this
    ) as FormFieldConfig[];
    return fields;
  }
}

// 使用示例
const form = new FormModel();
console.log("form.getFormData()", form.getFormData()); 

form.saveFormData({ username: "john", password: "", checkCode: "7777" });
console.log("getFormConfig", form.getFormConfig()); // 拿到配置项去vfor数据
console.log("saveFormData", form.getFormData());

console.log("checkFormData", form.checkFormData());

export default FormModel;

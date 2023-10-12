import 'reflect-metadata';

/**
 * @type 表单字段对应配置项类型。
 * @author zhaoyls
 */
interface FormFieldConfig {
  name: string;
  value?: string;
  label: string;
  type: string;
  isRequired: boolean;
  isHidden: boolean;
  list?: Array<{
    label: string;
    value: string | number;
  }>;
  [key: string]: any;
}

/**
 * @Symbol 生成唯一值，用于存储类的元数据。
 * 防止被污染，call方法中存 this 也是如此。
 */
const FORM_FIELDS_METADATA_KEY = Symbol('formFields');

/**
 * 表单字段装饰器
 * @param config 字段配置
 * @returns {PropertyDecorator}
 */
function FormField(config: FormFieldConfig): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol) {
    // 1、获取目标类的元数据数组
    // target.prototype[FORM_FIELDS_METADATA_KEY];
    const fieldList = Reflect.getMetadata(FORM_FIELDS_METADATA_KEY, target) || [];
    // 2、重新附加到目标类上。
    fieldList.push({ ...config, name: propertyKey, value: propertyKey });
    // target.prototype[FORM_FIELDS_METADATA_KEY] = fieldList;
    Reflect.defineMetadata(FORM_FIELDS_METADATA_KEY, fieldList, target);
  };
}

/**
 * 表单模型类，利用反射获取表单字段对应配置项，并存储为一个列表。
 * 整合表单配置项、合表单数据、业务逻辑功能（抽取到派生类，便于）。
 * @constructor
 */
export class FormModel {
  @FormField({
    name: 'username',
    label: '用户名',
    type: 'text',
    isRequired: true,
    isHidden: false,
  })
  public username: string = '';

  @FormField({
    name: 'password',
    label: '密码',
    type: 'password',
    isRequired: true,
    isHidden: false,
  })
  public password: string = '';

  @FormField({
    name: 'checkCode',
    label: '验证码',
    type: 'inputText',
    isRequired: true,
    isHidden: false,
  })
  public checkCode: string = '';

  protected constructor() {}
}

/**
 * 将方法都抽取到这个类中。
 * @constructor
 */
export class FormModelUtils extends FormModel {
  /**
   * 构造函数，用不上！
   */
  public constructor() {
    super();
  }

  /**
   * @FormField 每一项组成的列表
   * @returns {FormFieldConfig[]}
   */
  public getFormConfig(): FormFieldConfig[] {
    const fieldList = Reflect.getMetadata(FORM_FIELDS_METADATA_KEY, this) as FormFieldConfig[];
    return fieldList;
  }

  /**
   * 使用反射将表单数据重置
   */
  public resetField() {
    const fieldList = Reflect.getMetadata(FORM_FIELDS_METADATA_KEY, this) as FormFieldConfig[];
    for (const field of fieldList) {
      this[field.name] = '';
    }
  }
  /**
   * 使用反射将表单数据保存到对象中
   * @param formData 表单数据
   */
  public saveFormData(formData: FormModel) {
    const fieldList = Reflect.getMetadata(FORM_FIELDS_METADATA_KEY, this) as FormFieldConfig[];
    for (const field of fieldList) {
      this[field.name] = formData[field.name] || '';
    }
  }

  /**
   * 使用反射将表单数据从对象中提取出来
   * // @returns {Record<string, any>}
   *  @returns {FormModel}
   */
  public getFormData(): FormModel {
    const formData = {} as FormModel;
    const fieldList = Reflect.getMetadata(FORM_FIELDS_METADATA_KEY, this) as FormFieldConfig[];
    for (const field of fieldList) {
      formData[field.name] = this[field.name];
    }
    return formData;
  }

  /**
   * 检查对应的字段是否为空
   * 更多校验可使用 'class-validator'注解库，或自定义装饰器，反射处理。
   * 验证参考于掘金： https://juejin.cn/post/7076701579222450190
   * @returns {boolean}
   */
  public checkFormData() {
    const fieldList = Reflect.getMetadata(FORM_FIELDS_METADATA_KEY, this) as FormFieldConfig[];
    for (const field of fieldList) {
      const value = this[field.name];
      if (!value && field.isRequired && !field.isHidden) {
        console.log(field.name + value + '：' + '不能为空');
        return false;
      }
    }
    return true;
  }

  // 其他实现...
}

// const form = new FormModelUtils();
// console.log("form.getFormData()", form.getFormData());

// form.saveFormData({ username: "zylmo", password: "123456", checkCode: "123456" });

// console.log("saveFormData", form.getFormData());

// console.log("getFormConfig", form.getFormConfig());

// console.log("checkFormData", form.checkFormData());

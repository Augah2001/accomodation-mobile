import "text-encoding";
import Joi from "joi";
import { Dispatch, SetStateAction, useState } from "react";
import FormRadioButtons from "./FormRadioButtons";
import FormTextInput from "./FormTextInput";
import FormButton from "./FormButton";
import FormText from "./FormText";
import { ScrollView } from "react-native";

interface Props {
  children: (
    renderInput: (
      id: string,
      label: string,
      type: string,
      bool: boolean
    ) => JSX.Element,
    renderButton: (label: string) => JSX.Element,
    renderText: (
      route: string,
      text: string | null,
      linkText: string | null
    ) => JSX.Element,
    renderRadioButtons: (
      id: string,
      radioData: { label: string; value: any }[],
      handleRadioChange: (id: string, value: string) => void
    ) => JSX.Element
  ) => JSX.Element;
  doSubmit: () => void;
  schema: Joi.ObjectSchema<any> & { [key: string]: any };
  data: { [key: string]: any };
  setData: Dispatch<SetStateAction<{ [key: string]: any }>>;
}

const FormTemplate = ({ children, doSubmit, data, setData, schema }: Props) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const { error } = schema.validate(data);
    if (!error) return;
    const newErrors: { [key: string]: string } = {};
    error.details.map(
      (item) => (newErrors[item.path[0]] = error.message.replace(/["]/g, ""))
    );
    return newErrors;
  };

  const validateProperty = ({ id, value }: { id: string; value: string }) => {
    const property = { [id]: value };

    const newSchema = Joi.object({
      [id]: schema.extract(id),
    });

    const { error } = newSchema.validate(property);
    if (!error) return;
    return error.message.replace(/["]/g, "");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validate();

    if (errors) {
      setErrors(errors || {});
      console.log(errors);
    } else {
      doSubmit();
    }
  };

  const handleChange = (value: string, id: string) => {
    console.log(value);
    const newErrors = { ...errors };
    const errorMessage = validateProperty({ value, id });
    if (errorMessage) {
      newErrors[id] = errorMessage;
    } else delete newErrors[id];
    setErrors(newErrors);

    const newData = { ...data };
    newData[id] = value;
    setData(newData);
    validateProperty({ value, id });
  };

  const renderRadioButtons = (
    id: string,
    radioData: { label: string; value: any }[],
    handleRadioChange?: (id: string, value: string) => void
  ) => {
    return (
      <FormRadioButtons
        onChange={handleChange}
        data={data}
        setData={setData}
        id={id}
        radioData={radioData}
        errors={errors}
        handleRadioChange={handleRadioChange}
      />
    );
  };

  const renderInput = (
    id: string,
    label: string,
    type: string,
    bool: boolean
  ) => {
    return (
      <FormTextInput
        id={id}
        label={label}
        onChange={handleChange}
        value={data[id]}
        errors={errors}
        bool={bool}
      />
    );
  };

  const renderButton = (label: string) => {
    return <FormButton label={label} handlePress={handleSubmit} />;
  };

  const renderText = (
    route: string,
    text: string | null,
    linkText: string | null
  ) => {
    return <FormText route={route} text={text} linkText={linkText} />;
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {children(renderInput, renderButton, renderText, renderRadioButtons)}
    </ScrollView>
  );
};

export default FormTemplate;

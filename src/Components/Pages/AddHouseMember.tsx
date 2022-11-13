import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { HouseMemberModel } from "../../Models/house-member-model";
import { AiOutlineArrowRight } from "react-icons/ai";
import { tasksState } from "../../mobx/tasks-state";

export const formStyle = {
      width: '50%',
      margin: 'auto'
}
export const errStyle = {
      color: 'red'
}

const AddHouseMember = () => {
      const navigate = useNavigate();
      const { register, handleSubmit, formState } = useForm<HouseMemberModel>();

      const submit = (houseMember: HouseMemberModel) => {
            try {
                  tasksState.addHouseMember(houseMember);
                  alert(`'${houseMember.description}' Added Successfully`);
                  navigate('/add-task');
            } catch (err: any) {
                  alert(err.message);
            }
      };

      return (
            <Container>
                  <Form noValidate style={formStyle} onSubmit={handleSubmit(submit)}>

                        <FloatingLabel
                              label='First-Name'
                              className="mt-2">
                              <Form.Control
                                    type="text"
                                    autoFocus
                                    {...register('name', {
                                          required: { value: true, message: "Missing name" },
                                          minLength: { value: 3, message: "Name must be minimum 3 chars" },
                                          maxLength: { value: 100, message: "Name can't exceed 100 chars" }
                                    })}
                              />
                              <span className="mb-2" style={errStyle}>
                                    {formState.errors.name?.message}
                              </span>
                        </FloatingLabel>

                        <FloatingLabel
                              label={"Description"}
                              className="mt-2 mb-2">
                              <Form.Control
                                    type="text"
                                    required
                                    {...register('description', {
                                          required: { value: true, message: "Missing Description" },
                                          minLength: { value: 3, message: "Description must be minimum 3 chars" },
                                          maxLength: { value: 100, message: "Description can't exceed 100 chars" }
                                    })}
                              />
                              <span className="mb-2" style={errStyle}>
                                    {formState.errors.description?.message}
                              </span>
                        </FloatingLabel>

                        <Button variant="success" type="submit">
                              Add Member <AiOutlineArrowRight />
                        </Button>
                  </Form>
            </Container >
      )
}

export default AddHouseMember;
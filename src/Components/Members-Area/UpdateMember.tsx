import { useEffect, useMemo, useState } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { tasksState } from "../../mobx/tasks-state";
import { HouseMemberModel } from "../../Models/house-member-model";
import { formStyle, errStyle } from "./AddMember";

const UpdateMember = () => {
      const { register, handleSubmit, formState, setValue } = useForm<HouseMemberModel>();
      const [houseMember, setHouseMember] = useState<HouseMemberModel>();
      const navigate = useNavigate();
      const params = useParams();

      useEffect(() => {
            setValue("memberId", houseMember?.memberId);
            setValue("name", houseMember?.name);
            setValue("description", houseMember?.description);
      }, [setValue]);

      useMemo(() => {
            const memberId = params.memberId;
            const member = tasksState.houseMembers.find(houseMember => houseMember.memberId === memberId);
            setHouseMember(member);
      }, [params.memberId])

      const submit = (houseMember: HouseMemberModel) => {
            tasksState.updateHouseMember(houseMember);
            alert("House-Member updated successfully")
            navigate('/house-members');
      }

      return (
            <Container>
                  <Form style={formStyle} onSubmit={handleSubmit(submit)}>
                        <FloatingLabel
                              label='House-Member name'>
                              <Form.Control
                                    type="text"
                                    className="mt-2"
                                    defaultValue={houseMember?.name}
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
                              label='House-Member description'>
                              <Form.Control as={'textarea'}
                                    className="mt-2 mb-2"
                                    rows={5}
                                    type="text"
                                    defaultValue={houseMember?.description}
                                    {...register('description', {
                                          required: { value: true, message: "Missing description" },
                                          minLength: { value: 3, message: "Description must be minimum 3 chars" },
                                          maxLength: { value: 100, message: "Description can't exceed 100 chars" }
                                    })} />
                              <span className="mb-2" style={errStyle}>
                                    {formState.errors.description?.message}
                              </span>
                        </FloatingLabel>


                        <Button variant="secondary" type="submit" disabled={!formState.isDirty} className='mt-2'>
                              Complete ✔
                        </Button>
                  </Form>
            </Container>
      )
}

export default UpdateMember;
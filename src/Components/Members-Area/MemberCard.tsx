import { SyntheticEvent } from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { tasksState } from "../../mobx/tasks-state";
import { HouseMemberModel } from "../../Models/house-member-model"

export const cardStyle: React.CSSProperties = {
      width: 'auto',
      height: 'auto',
      borderRadius: '50%',
      display: "inline-flex",
      flexDirection: 'column',
      justifyContent: 'center',
      margin: '5px',
      boxShadow: '3px 3px 3px gray'
}

interface MemberCardProps {
      houseMember: HouseMemberModel;
}

const HouseMemberCard = (props: MemberCardProps) => {
      const navigate = useNavigate();

      const updateMember = () => {
            navigate('/update-member/' + props.houseMember.memberId);
      }
      const deleteMember = () => {
            const answer = window.confirm("Are you sure?");
            if (answer) {
                  tasksState.deleteHouseMember(props.houseMember.memberId);
            }
      }

      return (
            <Card style={cardStyle} className='overflow-hidden'>
                  <Card.Body>
                        <h1>
                              {props.houseMember.name}
                        </h1>
                        <h6 className="text-muted">
                              {props.houseMember.description}
                        </h6>
                  </Card.Body>
                  <Card.Footer>
                        <ButtonGroup size="sm">
                              <Button variant="secondary" onClick={updateMember}>
                                    edit
                              </Button>
                              <br />
                              <Button variant="danger" onClick={deleteMember}>
                                    Delete
                              </Button>
                        </ButtonGroup>
                  </Card.Footer>
            </Card>
      )
}

export default HouseMemberCard;
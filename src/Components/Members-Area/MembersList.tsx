import { autorun } from "mobx";
import { useEffect, useMemo, useState } from "react";
import { Card, Container, Nav, Row } from "react-bootstrap";
import { tasksState } from "../../mobx/tasks-state";
import { HouseMemberModel } from "../../Models/house-member-model";
import HouseMemberCard from "./MemberCard";

const addMemberCardStyle: React.CSSProperties = {
      width: '10rem',
      height: '10rem',
      borderRadius: '50%',
      display: "inline-flex",
      flexDirection: 'column',
      justifyContent: 'center',
      boxShadow: '3px 3px 3px gray'
}

const HouseMembersList = () => {
      const [houseMembers, setHouseMembers] = useState<HouseMemberModel[]>();

      useEffect(() => {
            const houseMembers = tasksState.houseMembers;
            setHouseMembers(houseMembers);
      }, []);

      useMemo(() => {
            autorun(() => {
                  const houseMembers = tasksState.houseMembers;
                  setHouseMembers(houseMembers);
            });
      }, [])
      return (
            <Container>
                  <h3>House-Members</h3>

                  <Row className="d-inline">
                        {houseMembers?.map(houseMember =>
                              <HouseMemberCard key={houseMember?.memberId} houseMember={houseMember} />
                        )}

                        <Card style={addMemberCardStyle} as={Nav.Link} href='/add-house-member'>
                              <h1>
                                    ➕
                              </h1>
                        </Card>
                  </Row>
            </Container>
      )
}

export default HouseMembersList;
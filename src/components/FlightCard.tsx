import React from 'react';
import { Badge, Card, Col } from "react-bootstrap";
import RocketImage from '../assets/rocket1.png'

interface FlightCardProps {
    i: number;
}

const FlightCard: React.FC<FlightCardProps> = ({ i }) => {
    return (
        <div>
            <Col key={i}>
                <Card className='mb-4'>
                    <img src={RocketImage} className='w-25 mx-auto my-4' alt="" />
                    <Card.Body className='text-center'>
                        <Card.Text>
                            <p>22 sept,2023</p>
                        </Card.Text>
                        <Card.Title>FalconSat</Card.Title>
                        <Card.Text>
                            <small className="text-muted">Felcon9</small>
                        </Card.Text>
                        <Card.Text>
                            <p>Launch Status:</p>
                        </Card.Text>
                        <Badge bg="success">
                            Success
                        </Badge>
                        {/* <Badge bg="danger">
                                                Failed
                                            </Badge> */}

                    </Card.Body>
                </Card>
            </Col>
        </div>
    );
};

export default FlightCard;
import React from 'react';
import { Badge, Card, Col } from "react-bootstrap";
import dayjs from 'dayjs';

interface FlightCardProps {
    i: number;
    data: {
        flight_number: number;
        mission_name: string;
        upcoming: boolean;
        launch_date_local: string;
        launch_success: boolean;
        links: {
            mission_patch: string;
        };
        rocket: {
            rocket_name: string;
        };
    };
}

const FlightCard: React.FC<FlightCardProps> = ({ i, data }) => {
    return (
        <div>
            <Col key={i}>
                <Card className='mb-4'>
                    <img src={data?.links?.mission_patch} className='w-25 mx-auto my-4' alt="" />
                    <Card.Body className='text-center'>
                        <Card.Text>
                            <p><span>Launch Date:</span>{dayjs(data?.launch_date_local).format('DD MMM, YYYY')}</p>
                        </Card.Text>
                        <Card.Title>{data?.mission_name}</Card.Title>
                        <Card.Text>
                            <small className="text-muted">{data?.rocket?.rocket_name}</small>
                        </Card.Text>
                        <Card.Text>
                            <p>Launch Status:</p>
                        </Card.Text>
                        {
                            data?.launch_success ?
                                <Badge bg="success">
                                    Success
                                </Badge> :
                                <Badge bg="danger">
                                    Failed
                                </Badge>
                        }
                    </Card.Body>
                </Card>
            </Col>
        </div>
    );
};

export default FlightCard;
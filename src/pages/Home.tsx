import React from 'react';
import { InputGroup, Form, Button, Row, Pagination } from 'react-bootstrap';
import { BsSearch } from "react-icons/bs";
import FlightCard from '../components/FlightCard';
export default function Home() {
    return (
        <React.Fragment>
            <div className='text-start text-md-center mt-5'>
                <h2>Spaceflight details</h2>
                <small>Find out the elaborate features of all the past big spaceflights.</small>
            </div>
            <div className='d-none d-md-flex justify-content-end'>
                <Form.Check // prettier-ignore
                    type={'checkbox'}
                    label={'Show upcoming only'}
                />
            </div>
            <div className='d-md-flex justify-content-between align-items-center'>
                <div>
                    <InputGroup>
                        <Form.Control
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                        <Button className='bg-primary text-light' variant="outline-secondary" id="button-addon2">
                            <BsSearch />
                        </Button>
                    </InputGroup>
                </div>
                <div className='d-block d-md-none my-2'>
                    <Form.Check // prettier-ignore
                        type={'checkbox'}
                        label={'Show upcoming only'}
                    />
                </div>
                <div className='d-md-flex align-items-center'>
                    <div>
                        <Form.Select aria-label="Default select example">
                            <option>By Launch Status</option>
                            <option value="1">Failed</option>
                            <option value="2">Success</option>
                        </Form.Select>
                    </div>
                    <div className='ms-md-4 my-2 my-md-0'>
                        <Form.Select aria-label="Default select example">
                            <option>By Launch Date</option>
                            <option value="1">Last Weak</option>
                            <option value="2">Last Month</option>
                            <option value="2">Last Year</option>
                        </Form.Select>
                    </div>
                </div>
            </div>
            <div className='my-4'>
                <Row xs={1} md={2} xl={3}>
                    {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((res, i) => (
                        <FlightCard i={i} />
                    ))}
                </Row>
            </div>
            <div className='d-flex justify-content-center'>
                <Pagination>
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Ellipsis />
                    <Pagination.Item>{5}</Pagination.Item>
                    <Pagination.Ellipsis />
                    <Pagination.Item>{10}</Pagination.Item>
                    <Pagination.Next />
                    <Pagination.Last />
                </Pagination>
            </div>
            <p className='text-center'>Created by the brilliant minds behind SpaceX</p>
        </React.Fragment>
    )
}
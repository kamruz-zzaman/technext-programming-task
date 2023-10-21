import React from 'react';
import { InputGroup, Form, Button, Row, Pagination, Spinner, Alert } from 'react-bootstrap';
import { BsSearch } from "react-icons/bs";
import FlightCard from '../components/FlightCard';
import axios from 'axios';
import dayjs from 'dayjs';

type RocketLaunch = {
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

export default function Home() {
    const [rocketLaunch, setRocketLaunch] = React.useState<RocketLaunch[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [filteredData, setFilteredData] = React.useState<RocketLaunch[]>([]);
    const [searchText, setSearchText] = React.useState<string>('');
    const [showUpcomingOnly, setShowUpcomingOnly] = React.useState<boolean>(false);
    const [launchStatusFilter, setLaunchStatusFilter] = React.useState<string>('all');
    const [launchDateFilter, setLaunchDateFilter] = React.useState<string>('all');
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const itemsPerPage = 9;

    React.useEffect(() => {
        setIsLoading(true);
        axios.get<RocketLaunch[]>('https://api.spacexdata.com/v3/launches')
            .then(res => {
                setRocketLaunch(res.data);
                setFilteredData(res.data);
                setIsLoading(false);
            });
    }, []);

    const filterRocketLaunches = (search: string, upcoming: boolean, status: string, date: string) => {
        setIsLoading(true);
        setTimeout(() => {
            setFilteredData(rocketLaunch.filter((launch) => {
                // Filter by search text
                if (search && !launch.mission_name.toLowerCase().includes(search.toLowerCase())) {
                    setIsLoading(false);
                    return false;
                }

                // Filter by show upcoming only
                if (upcoming && !launch.upcoming) {
                    setIsLoading(false);
                    return false;
                }

                // Filter by launch status
                if (status !== 'all') {
                    if (!launch.launch_success && status !== 'Failed') {
                        setIsLoading(false);
                        return false;
                    }
                    if (launch.launch_success && status !== 'Success') {
                        setIsLoading(false);
                        return false;
                    }
                }

                // Filter by launch date
                if (date !== 'all') {
                    const launchDate = dayjs(launch.launch_date_local);
                    const now = dayjs();
                    if (date === 'lastWeek' && now.diff(launchDate, 'days') > 7) {
                        setIsLoading(false);
                        return false;
                    }
                    if (date === 'lastMonth' && now.diff(launchDate, 'days') > 30) {
                        setIsLoading(false);
                        return false;
                    }
                    if (date === 'lastYear' && now.diff(launchDate, 'days') > 365) {
                        setIsLoading(false);
                        return false;
                    }
                }
                setIsLoading(false);
                return true;
            }));
        }, 1000)

    };


    // Function to paginate the data
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <React.Fragment>
            <div className='text-start text-md-center my-5'>
                <h2>Spaceflight details</h2>
                <small className="text-muted">Find out the elaborate features of all the past big spaceflights.</small>
            </div>
            <div className='mb-4'>
                <div className='d-none d-md-flex justify-content-end mb-2'>
                    <Form.Check
                        type={'checkbox'}
                        label={'Show upcoming only'}
                        checked={showUpcomingOnly}
                        onChange={(e) => {
                            filterRocketLaunches(searchText, e.target.checked, launchStatusFilter, launchDateFilter)
                            setShowUpcomingOnly(e.target.checked)
                        }}
                    />
                </div>
                <div className='d-md-flex justify-content-between align-items-center'>
                    <div className='mb-3 mb-md-0'>
                        <InputGroup>
                            <Form.Control
                                placeholder="Search..."
                                aria-label="Search..."
                                aria-describedby="basic-addon2"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <Button
                                onClick={() => filterRocketLaunches(searchText, showUpcomingOnly, launchStatusFilter, launchDateFilter)}
                                className='bg-primary text-light'
                                variant="outline-secondary"
                                id="button-addon2"
                            >
                                <BsSearch />
                            </Button>
                        </InputGroup>
                    </div>
                    <div className='d-block d-md-none my-2'>
                        <Form.Check
                            type={'checkbox'}
                            label={'Show upcoming only'}
                            checked={showUpcomingOnly}
                            onChange={(e) => {
                                filterRocketLaunches(searchText, e.target.checked, launchStatusFilter, launchDateFilter)
                                setShowUpcomingOnly(e.target.checked)
                            }}
                        />
                    </div>
                    <div className='d-md-flex align-items-center'>
                        <div>
                            <Form.Select
                                aria-label="Default select example"
                                value={launchStatusFilter}
                                onChange={(e) => {
                                    filterRocketLaunches(searchText, showUpcomingOnly, e.target.value, launchDateFilter)
                                    setLaunchStatusFilter(e.target.value)
                                }}
                            >
                                <option value="all">By Launch Status</option>
                                <option value="Failed">Failed</option>
                                <option value="Success">Success</option>
                            </Form.Select>
                        </div>
                        <div className='ms-md-4 my-2 my-md-0'>
                            <Form.Select
                                aria-label="Default select example"
                                onChange={(e) => {
                                    filterRocketLaunches(searchText, showUpcomingOnly, launchStatusFilter, e.target.value)
                                    setLaunchDateFilter(e.target.value)
                                }}
                            >
                                <option value="all">By Launch Date</option>
                                <option value="lastWeek">Last Week</option>
                                <option value="lastMonth">Last Month</option>
                                <option value="lastYear">Last Year</option>
                            </Form.Select>
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-4'>
                {
                    isLoading ?
                        <div className='d-flex justify-content-center align-items-center my-5'>
                            <Spinner animation="border" variant="primary" />
                        </div> :
                        paginatedData.length === 0 ?
                            <Alert className='text-center mt-5' variant={'light'}>
                                No Data Found!
                            </Alert> :
                            <div className='my-4'>
                                <Row xs={1} md={2} xl={3}>
                                    {paginatedData.map((res, i) => (
                                        <FlightCard i={i} data={res} />
                                    ))}
                                </Row>
                            </div>
                }
            </div>
            {
                filteredData.length > 0 &&
                <div className='d-flex justify-content-center mb-5'>
                    <Pagination>
                        <Pagination.Prev
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage <= 1}
                        />
                        {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map((_, index) => {
                            const pages = Math.ceil(filteredData.length / itemsPerPage);
                            if (pages <= 7) {
                                return (
                                    <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
                                        {index + 1}
                                    </Pagination.Item>
                                );
                            } else {
                                if (index === 0 || index === pages - 1 || (index >= currentPage - 1 && index <= currentPage + 1)) {
                                    return (
                                        <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
                                            {index + 1}
                                        </Pagination.Item>
                                    );
                                } else if (index === currentPage - 2 || index === currentPage + 2) {
                                    return (
                                        <Pagination.Ellipsis key={index} disabled />
                                    );
                                } else {
                                    return null;
                                }
                            }
                        })}
                        <Pagination.Next
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage >= Math.ceil(filteredData.length / itemsPerPage)}
                        />
                    </Pagination>

                </div>
            }

            <p className={`text-center ${filteredData?.length === 0 && 'fixed-bottom'}`}>Created by the brilliant minds behind SpaceX</p>
        </React.Fragment>
    )
}
import {
  Button,
  Card,
  Layout,
} from 'antd';
import React from 'react';
import ScheduleComponent from '../components/Schedule';


/**
 * Class Schedule
 */
export default class Schedule extends React.PureComponent {
  /**
	 * Render the component.
	 *
	 * @return {*}
	 */
  render() {
    return (
      <Layout className="flex flex-1 flex-col">
        <Layout.Header className="text-white">eKVV</Layout.Header>

        <Layout.Content className="flex flex-col pt-6 pb-4 px-4">
          <Button.Group className="flex justify-center">
            <Button className="flex-1">Mo</Button>
            <Button className="flex-1" type="primary">Di</Button>
            <Button className="flex-1">Mi</Button>
            <Button className="flex-1">Do</Button>
            <Button className="flex-1">Fr</Button>
          </Button.Group>

          <Card
            className="flex flex-1 mt-4"
            bodyStyle={{
              display: 'flex',
              flex: 1,
              padding: 0,
            }}
          >
            <ScheduleComponent events={[]}/>
          </Card>
        </Layout.Content>
      </Layout>
    );
  }
}

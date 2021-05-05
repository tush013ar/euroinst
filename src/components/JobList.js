import React from 'react';
import { Job } from './Job';
import { Text, View } from 'native-base';

export const JobList = ({ jobsData, loggedIn, jobData, setTaskID }) => {
  if (jobsData.length === 0) {
    return <Text>Loading..</Text>;
  } else {
    return (
      <View>
        {jobsData.map((job) => (
          <Job
            Type={job.Type}
            Description={job.Description}
            TaskDate={job.TaskDate}
            Id = {job.ID}
            JobID={job.JobID}
            Location={job.Location}
            JobDescription={job.JobDescription}
            SetTaskID={setTaskID}
            LoggedIn={loggedIn}
            AddJobData={jobData}
          />
        ))}
      </View>
    );
  }
};

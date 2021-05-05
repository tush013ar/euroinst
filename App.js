import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Login } from "./src/components/Login";
import { Index } from "./src/components/Index";
import { JobInfo } from "./src/components/JobInfo";
import { usePermissions } from "@use-expo/permissions";
import * as Permissions from "expo-permissions";
import "react-native-gesture-handler";

export default function App() {
  const [permission, askForPermission] = usePermissions(Permissions.CAMERA, {
    ask: true,
  });
  const [
    filePermission,
    askForFilePermission,
  ] = usePermissions(Permissions.MEDIA_LIBRARY, { ask: true });

  const [loggedIn, setLoggedIn] = useState(0);
  const [jobsData, setJobsData] = useState("");
  const [jobData, setJobData] = useState("");
  const [selectedTaskId, setSelectedTaskID] = useState("");

  useEffect(() => {
    console.log("jobData", jobData);
  }, [jobData]);

  if (loggedIn == 1) {
    return (
      <Index
        addJobsData={jobsData}
        addJobData={setJobData}
        addIsLogin={setLoggedIn}
        setTask={setSelectedTaskID}
        setJobsData={setJobsData}
      />
    );
  } else if (loggedIn == 0) {
    return <Login addIsLogin={setLoggedIn} addJobsData={setJobsData} />;
  } else if (loggedIn == 2) {
    return (
      <JobInfo
        JobDetailData={jobData}
        addIsLogin={setLoggedIn}
        TaskId={selectedTaskId}
        setJobsData={setJobsData}
        jobDatas={jobsData}
      />
    );
  }
}

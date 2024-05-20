export const mockUsers = (num) => {
  const data = [
    { id: '20462', name: 'Matt Dickerson', age: 78, gender: 'Male', sickness: 'Sepsis', alerts: 'N/A', status: 'Stable' },
    { id: '18933', name: 'Victoria', age: 83, gender: 'Female', sickness: 'Organ Failure', alerts: 'N/A', status: 'Stable' },
    { id: '45169', name: 'Trixie Byrd', age: 65, gender: 'Female', sickness: 'Respiratory Failure', alerts: 'N/A', status: 'Unstable' },
    { id: '34304', name: 'Brad Mason', age: 25, gender: 'Male', sickness: 'Traumatic Injuries', alerts: '01', status: 'Unstable' },
    { id: '17188', name: 'Sanderson', age: 59, gender: 'Male', sickness: 'Cardiac Conditions', alerts: '02', status: 'Critical' },
    { id: '20462', name: 'Matt Dickerson', age: 78, gender: 'Male', sickness: 'Sepsis', alerts: 'N/A', status: 'Stable' },
    { id: '18933', name: 'Victoria', age: 83, gender: 'Female', sickness: 'Organ Failure', alerts: 'N/A', status: 'Stable' },
    { id: '45169', name: 'Trixie Byrd', age: 65, gender: 'Female', sickness: 'Respiratory Failure', alerts: 'N/A', status: 'Unstable' },
    { id: '34304', name: 'Brad Mason', age: 25, gender: 'Male', sickness: 'Traumatic Injuries', alerts: '01', status: 'Unstable' },
    { id: '17188', name: 'Sanderson', age: 59, gender: 'Male', sickness: 'Cardiac Conditions', alerts: '02', status: 'Critical' }
  ];

  return data.slice(0, num);
};

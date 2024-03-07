import React from 'react';

import serviceMessageStore from './serviceMessageStore';

const stores = React.createContext({
  ServiceMessageStore: serviceMessageStore,
});

export default stores;
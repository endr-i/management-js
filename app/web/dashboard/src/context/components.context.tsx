import lodash from 'lodash';
import React, { createContext, lazy, useContext, useMemo } from 'react';

export type Components = Record<string, React.FC>;

const defaultComponents: Components = {
  user: lazy(() => import('../component/user/user-list')),
};

const noComponents: Components = {};

const ComponentsContext = createContext(defaultComponents);

const ComponentProvider: React.FC<{ children: React.ReactNode, components: Components }> =
  ({ children, components = noComponents }) => {
    const providedComponents = useMemo(
      () => lodash.merge({}, defaultComponents, components),
      [defaultComponents, components],
    );

    return (
      <ComponentsContext.Provider value={providedComponents}>
        {children}
      </ComponentsContext.Provider>
    );
  };

export const useComponents = () => useContext<Components>(ComponentsContext);

export default ComponentProvider;

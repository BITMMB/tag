import useOperationList from './useOperationList';

const useOperationFactory = ({ domains }) => {
  const { operations, setOperations, resetOperations, zones } =
    useOperationList({ domains });

  const runFactory = async ({ zoneUrl, zones }) => {
    let result;

    const opNames = Object.keys(operations);
    for (const name of opNames) {
      setOperations((prevOps) => ({
        ...prevOps,
        [name]: { ...prevOps[name], state: 'running' },
      }));

      try {
        result = await operations[name].operation({ zoneUrl, result, zones });

        setOperations((prevOps) => ({
          ...prevOps,
          [name]: { ...prevOps[name], state: 'success', result },
        }));
      } catch (error) {
        setOperations((prevOps) => ({
          ...prevOps,
          [name]: { ...prevOps[name], state: 'failed', error },
        }));
      }
    }
  };

  return { runFactory, operations, zones, resetOperations };
};

export default useOperationFactory;

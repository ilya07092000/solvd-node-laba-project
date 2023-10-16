/**
 * returns an array of needed fields
 */
const checkMandatoryFields = ({
  fields = [],
  obj = {},
}: {
  fields: string[];
  obj: object;
}) => {
  const objKeys = Object.keys(obj);
  return fields.reduce((acc, currField) => {
    if (!objKeys.includes(currField)) {
      acc.push(currField);
    }
    return acc;
  }, []);
};

export { checkMandatoryFields };

export function sanitizeDocument<T extends { _id: any; toObject: () => any }>(
  doc: T,
  fieldsToExclude: string[] = []
): Omit<ReturnType<T["toObject"]>, "_id" | "toObject"> & { id: string } {
  const obj = doc.toObject();

  obj.id = obj._id.toString();
  delete obj._id;
  delete obj.__v;

  for (const field of fieldsToExclude) {
    delete obj[field];
  }

  return obj;
}

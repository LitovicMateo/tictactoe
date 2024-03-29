export const aiMove = (fields: number[]) => {
	const length = fields.length;
	const choice = Math.floor(Math.random() * length);

	return fields[choice];
};

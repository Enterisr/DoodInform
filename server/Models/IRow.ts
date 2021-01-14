export default interface IRow {
	Group: number;
	Duration: number;
	User: string;
	Time: Date;
	toString(): string;
};

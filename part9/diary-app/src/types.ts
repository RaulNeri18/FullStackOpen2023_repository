export interface HeaderProps {
  courseName: string;
}

export interface TotalProps {
  totalExercises: number;
}

export interface PartProps {
  coursePart: CoursePart;
}

export interface ContentProps {
  courseParts: CoursePart[];
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseDescription extends CoursePartBase {
  description: string;
}
/************************/
interface CoursePartBasic extends CoursePartBaseDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBaseDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartRequirement extends CoursePartBaseDescription {
  requirements: string[];
  kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirement;
export interface CourseModel {
    course_id: number;
    course_name : string;
    course_students : number;
    course_duration : number;
    career: any;
    course_parallel : string;
    course_shift : string;
}

export interface CreateCourseModel extends Omit<CourseModel, 'course_id'> {}

export interface UpdateCourseModel extends Partial<CourseModel> {}
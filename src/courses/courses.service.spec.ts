import { randomUUID } from 'crypto';
import { CoursesService } from './courses.service';
import { Any } from 'typeorm';
import { create } from 'domain';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

describe('CoursesService unit tests', () => {
  let service: CoursesService;
  let id: string
  let expectOutputTags :any
  let expectOutputCourses: any
  let mockCourseRepository:any
  let mockTagRepository:any
  beforeEach(async () => { //executa a cada todos its
    service = new CoursesService()
    id= randomUUID()
    expectOutputTags =[
      {
        id,
        name:'nestjs'
      }
    ]
    expectOutputCourses =[
      {
        id,
        name:'curso de node',
        description:' curso de backend javascript',
        tags:expectOutputTags
      }
    ]
    mockCourseRepository ={
      create:jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      update: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findAll:jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      find:jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findOne:jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      remove:jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),

    }
    mockTagRepository={
      create:jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn()
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a course',  async() => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
     //@ts-expect-error defined part of methods
    service['tagRepository'] =mockTagRepository

    const createCourseDTO:CreateCourseDTO ={
      name:'curso de node',
      description:' curso de backend javascript',
      tags: ['nestjs']

    }
    
    const newCourse = await service.create(createCourseDTO)
    expect(mockCourseRepository.save).toHaveBeenCalled()
    expect(expectOutputCourses).toStrictEqual(newCourse)
  });

  it('should list all course',  async() => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
     //@ts-expect-error defined part of methods
    service['tagRepository'] =mockTagRepository
    
    const courses = await service.findAll()
    expect(mockCourseRepository.find).toHaveBeenCalled()
    expect(expectOutputCourses).toStrictEqual(courses)
  });

  it('should gets a course by id',  async() => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
     //@ts-expect-error defined part of methods
    service['tagRepository'] =mockTagRepository
    
    const course = await service.findOne(id)
    expect(mockCourseRepository.findOne).toHaveBeenCalled()
    expect(expectOutputCourses).toStrictEqual(course)
  });

  it('should update a course',  async() => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
     //@ts-expect-error defined part of methods
    service['tagRepository'] =mockTagRepository

    const updateCourseDTO:UpdateCourseDTO ={
      name:'curso de node',
      description:' curso de backend javascript',
      tags: ['nestjs']

    }
    
    const course = await service.update(id,updateCourseDTO)
    expect(mockCourseRepository.save).toHaveBeenCalled()
    expect(mockCourseRepository.preload).toHaveBeenCalled()
    expect(expectOutputCourses).toStrictEqual(course)
  });

  it('should delete a course',  async() => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
     //@ts-expect-error defined part of methods
    service['tagRepository'] =mockTagRepository
    
    const course = await service.remove(id)
    expect(mockCourseRepository.findOne).toHaveBeenCalled()
    expect(mockCourseRepository.remove).toHaveBeenCalled()
    expect(expectOutputCourses).toStrictEqual(course)
  });
});



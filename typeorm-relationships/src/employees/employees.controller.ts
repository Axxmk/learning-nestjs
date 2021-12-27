import { Controller, Post, Get, Patch, Delete, Body, Param, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { CreateContactInfoDto } from './dto/create-contact-info.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) { }

  @Post()
  async createEmployee(@Body() createEmployee: CreateEmployeeDto): Promise<Employee> {
    try {
      return await this.employeesService.createEmployee(createEmployee);
    }
    catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get()
  async findAll(): Promise<Employee[]> {
    return this.employeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.findOneById(id);
  }

  @Patch(':id')
  updateEmployee(@Param('id') id: string, @Body() updateEmployee: UpdateEmployeeDto) {
    return this.employeesService.update(+id, updateEmployee);
  }

  @Delete(':id')
  removeEmployee(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }


  //* Contact-info route handlers

  @Post('contact')
  async createContact(@Body() createContactInfoDto: CreateContactInfoDto) {
    try {
      return await this.employeesService.createContactInfo(createContactInfoDto);
    }
    catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}

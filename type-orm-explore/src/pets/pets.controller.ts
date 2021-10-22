import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) { }

  @Post()
  create(@Body() createPetDto: CreatePetDto): Promise<Pet> {
    return this.petsService.createPet(createPetDto);
  }

  @Get()
  findAll(): Promise<Pet[]> {
    return this.petsService.getAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Pet> {
    return this.petsService.getOneById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePetDto: UpdatePetDto): Promise<Pet> {
    return this.petsService.updatePet(id, updatePetDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<Pet> {
    return this.petsService.removePet(id);
  }
}

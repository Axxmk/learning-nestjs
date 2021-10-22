import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsService {
  constructor(@InjectRepository(Pet) private petRepository: Repository<Pet>) { }

  async createPet(createPetDto: CreatePetDto): Promise<Pet> {
    try {
      const newPet = this.petRepository.create({ ...createPetDto });
      return await this.petRepository.save(newPet);
    }
    catch (err) {
      // handle an error
      throw new BadRequestException(err.message);
    }
  }

  getAll(): Promise<Pet[]> {
    return this.petRepository.find({ relations: ['owner'] });
  }

  async getOneById(id: number): Promise<Pet> {
    try {
      const pet = await this.petRepository.findOneOrFail(id, { relations: ['owner'] });
      return pet;
    }
    catch (err) {
      // handle an error
      throw new NotFoundException(err.message);
    }
  }

  async updatePet(id: number, updatePetDto: UpdatePetDto): Promise<Pet> {
    const pet = await this.getOneById(id);

    if (updatePetDto.breed) pet.breed = updatePetDto.breed;
    if (updatePetDto.name) pet.name = updatePetDto.name;
    if (updatePetDto.owner) pet.owner = updatePetDto.owner;

    return this.petRepository.save(pet);
  }

  async removePet(id: number): Promise<Pet> {
    const pet = await this.getOneById(id);

    return this.petRepository.remove(pet);
  }
}

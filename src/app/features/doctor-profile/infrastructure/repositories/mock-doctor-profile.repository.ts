import { Injectable } from '@angular/core';
import { DoctorProfileRepository } from '../../domain/interfaces/doctor-profile.repository';
import { DoctorProfile } from '../../domain/models/doctor-profile.model';
/** Replace these values with approved information. Never use fake contact destinations. */
export const MOCK_DOCTOR_PROFILE: DoctorProfile = {
  id: 'oscar-juan-soto-caminada',
  name: 'Dr. Oscar Juan Soto Caminada',
  specialty: 'Médico general',
  cmp: '29626',
  headline: 'Tu bienestar merece tiempo y atención.',
  introduction:
    'Un espacio para hablar de tu salud, resolver tus dudas y encontrar juntos el siguiente paso de tu atención.',
  photo: 'assets/doctors/oscar-soto.png',
  logo: 'assets/brand/ozon-logo-white.svg',
  location: 'José Luis Bustamante y Rivero, Arequipa',
  mapUrl: 'https://maps.app.goo.gl/qJ1h4nhepdk7JgaQ7',
  phoneLabel: '+51 959 281 145',
  phone: '+51959281145',
  whatsapp: '+51959281145',
  appointmentUrl:
    'https://wa.me/51959281145?text=' +
    encodeURIComponent('Hola, quisiera coordinar una cita con el Dr. Oscar Juan Soto Caminada.'),
  socialNetworks: [
    { type: 'instagram', label: 'Instagram', url: null },
    { type: 'facebook', label: 'Facebook', url: null },
    { type: 'linkedin', label: 'LinkedIn', url: null },
  ],
  services: [
    {
      id: 'ozonoterapia',
      name: 'Ozonoterapia',
      category: 'ozone',
      description: 'Una opción complementaria que empieza con una valoración médica.',
      detail:
        'Conversamos sobre tu motivo de consulta y revisamos si este enfoque es adecuado para ti. Resuelve tus dudas sobre el procedimiento y sus consideraciones antes de decidir.',
    },
    {
      id: 'terapia-del-dolor',
      name: 'Terapia del Dolor',
      category: 'pain',
      description: 'Hablemos de tu dolor y de cómo influye en tu día a día.',
      detail:
        'Revisión de tus síntomas y antecedentes para orientar la atención. Las opciones se conversan después de una evaluación individual, con un plan acorde a tus necesidades.',
    },
    {
      id: 'consulta-medica',
      name: 'Consulta médica',
      category: 'consultation',
      description: 'Atención de medicina general, con espacio para escucharte.',
      detail:
        'Revisamos tus antecedentes y el motivo de tu visita. Recibe orientación sobre tu salud, resuelve tus preguntas y conoce los siguientes pasos de tu atención.',
    },
  ],
};
@Injectable()
export class MockDoctorProfileRepository implements DoctorProfileRepository {
  async getProfile(): Promise<DoctorProfile> {
    return MOCK_DOCTOR_PROFILE;
  }
}

/**
 * @flow
 */
import React from 'react';
import {
  Picker,
  OptionGroup,
  Option,
} from '../components/Picker';

const onChange = (options) => {};

const PickerUsage1 = () => (
  <Picker
    icon="location"
    placeholder="Выберите кинотеатр"
    onChange={onChange}
  >
    <OptionGroup>
      <Option value={1} label="Все кинотеатры, Минск" />
      <Option value={2} label="Galileo" />
      <Option value={3} label="Arena" />
      <Option value={4} label="DanaMall" />
    </OptionGroup>
  </Picker>
);

const PickerUsage2 = () => (
  <Picker
    multiple
    icon="location"
    placeholder="Формат показа"
    onChange={onChange}
  >
    <OptionGroup groupTitle="Технологии">
      <Option value="2d" label="2d" />
      <Option value="3d" label="3d" />
      <Option value="Dolby Atmos" label="Dolby Atmos" />
      <Option value="Dolby Digital" label="Dolby Digital" />
    </OptionGroup>
    <OptionGroup groupTitle="Комфорт">
      <Option value="места LoveSeats" label="места LoveSeats" />
      <Option value="места Реклайнер" label="места Реклайнер" />
      <Option value="места PremierSofa" label="места PremierSofa" />
      <Option value="VIP-зал" label="VIP-зал" />
      <Option value="места Комфорт" label="места Комфорт" />
    </OptionGroup>
    <OptionGroup groupTitle="Язык">
      <Option value="Русский" label="Русский" />
      <Option value="English" label="English" />
    </OptionGroup>
  </Picker>
);

const PickerUsage3 = () => (
  <Picker
    icon="location"
    placeholder="Выберите день"
    onChange={onChange}
  >
    <OptionGroup>
      <Option value={1} label="Сегодня" />
      <Option value={2} label="Завтра" />
      <Option value={3} label="Послезавтра" />
      <Option value={4} label="Пятнадцатого никогда" />
    </OptionGroup>
  </Picker>
);

const PickerUsage4 = () => (
  <Picker
    icon="location"
    placeholder="Выберите время"
    onChange={onChange}
  >
    <OptionGroup>
      <Option value={1} label="Утро" />
      <Option value={2} label="День" />
      <Option value={3} label="Ранний вечер" />
      <Option value={4} label="Вечер" />
    </OptionGroup>
  </Picker>
);

export {
  PickerUsage1,
  PickerUsage2,
  PickerUsage3,
  PickerUsage4,
};

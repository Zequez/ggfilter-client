import * as React from 'react';
import { FiltersConfiguration, Game } from '../../../filter';
import { FiltersNames } from '../../../../Definitions';
import Batch from './Batch';

interface BodyProps {
  gamesPages: Game[][];
  configuration: FiltersConfiguration;
  setQuery: (filter: FiltersNames, query: {}) => void;
  setLightbox: (images: string[], thumbnails: string[]) => void;
}

export default function Body ({gamesPages, configuration, setQuery, setLightbox}: BodyProps) {
  let batches = [];
  for (let i = 0; i < gamesPages.length; ++i) {
    batches.push(
      <Batch
        key={i}
        games={gamesPages[i]}
        configuration={configuration}
        setQuery={setQuery}
        setLightbox={setLightbox}/>
    );
  }

  return batches;
}

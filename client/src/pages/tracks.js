import React from 'react';
import { Layout, QueryResult } from '../components';
import { gql, useQuery } from "@apollo/client";
import TrackCard from '../containers/track-card';

// export for use in unit tests
export const TRACKS = gql`
  query getTracks {
    tracksForHome {
      id
      title
      thumbnail
      durationInSeconds
      modulesCount
      writtenBy {
        id
        name
        photo
      }
    }
  }
`;

/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
const Tracks = () => {
  const { loading, error, data} = useQuery(TRACKS);

  return <Layout grid>
          <QueryResult error={error} loading={loading} data={data}>
            {data?.tracksForHome?.map(track => (
            <TrackCard key={track.id} track={track} />
            ))}
          </QueryResult> 
  </Layout>;
};

export default Tracks;

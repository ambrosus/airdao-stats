import InfoIcon from '@/components/icons/info-icon';

const Notify = () => {
  return (
    <div className="flex items-center">
      <span className="mr-4">
        <InfoIcon />
      </span>
      <p>
        Node Tracker shows statistics of detected nodes running on the network.
        Statistics include the list of continents with the stake size, world map
        and decentralization of the AirDAO project... Learn more in AirDAO
        Academy.
      </p>
    </div>
  );
};

export default Notify;

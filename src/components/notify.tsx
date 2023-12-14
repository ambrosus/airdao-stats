import InfoIcon from '@/components/icons/info-icon';
import AnchorLink from '@/components/ui/links/anchor-link';

const Notify = () => {
  return (
    <div className="flex items-center">
      <span className="mr-4">
        <InfoIcon />
      </span>
      <p>
        Node Tracker shows statistics of detected nodes running on the network.
        Statistics include the list of continents with the stake size, world map
        and decentralization of the AirDAO project...{' '}
        <AnchorLink target="_blank" href="https://airdao.io/academy">
          Learn more in AirDAO Academy
        </AnchorLink>
        .
      </p>
    </div>
  );
};

export default Notify;

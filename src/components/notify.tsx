import InfoIcon from '@/components/icons/info-icon';
import AnchorLink from '@/components/ui/links/anchor-link';

const Notify = () => {
  return (
    <div className="flex items-center">
      <span className="mr-4">
        <InfoIcon />
      </span>
      <p>
        Node Tracker shows statistics of active AirDAO network nodes. The
        statistics include total AMB staked per continent and a map of global
        node distribution. Learn more about network decentralization with{' '}
        <AnchorLink target="_blank" href="https://airdao.io/academy">
          AirDAO Academy
        </AnchorLink>
        .
      </p>
    </div>
  );
};

export default Notify;

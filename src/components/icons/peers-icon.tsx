const PeersIcon: React.FC<React.SVGAttributes<{}>> = (props) => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.02687 4.162C5.97941 3.87555 5.9949 3.5822 6.07225 3.30234C6.14961 3.02247 6.28697 2.76281 6.47479 2.54139C6.66262 2.31996 6.8964 2.14209 7.1599 2.02013C7.4234 1.89817 7.7103 1.83505 8.00065 1.83514C8.29101 1.83524 8.57786 1.89856 8.84128 2.0207C9.1047 2.14284 9.33836 2.32087 9.52604 2.54242C9.71371 2.76397 9.8509 3.02372 9.92806 3.30364C10.0052 3.58355 10.0205 3.87691 9.97287 4.16333L11.5942 3.558C11.9773 3.4184 12.3996 3.43303 12.7721 3.59881C13.1446 3.76459 13.4382 4.06855 13.5909 4.4466C13.7436 4.82464 13.7435 5.24722 13.5906 5.6252C13.4378 6.00319 13.1441 6.30704 12.7715 6.47267L10.6669 7.39V9.46333L11.9222 13.108C12.0537 13.4926 12.0283 13.9135 11.8515 14.2794C11.6747 14.6454 11.3607 14.9269 10.9777 15.0628C10.5946 15.1987 10.1734 15.1782 9.80549 15.0055C9.43754 14.8329 9.15249 14.5221 9.0122 14.1407L8.0022 11.3753L6.9942 14.142C6.85318 14.5233 6.56769 14.8338 6.1995 15.0062C5.83132 15.1786 5.41004 15.1992 5.02684 15.0633C4.64363 14.9275 4.32932 14.6463 4.15191 14.2804C3.9745 13.9146 3.94826 13.4937 4.07887 13.1087L5.33353 9.47133V7.39133L3.12953 6.42267C2.75478 6.25959 2.45859 5.95653 2.30415 5.57814C2.14971 5.19975 2.14925 4.77599 2.30286 4.39727C2.45648 4.01854 2.752 3.71483 3.1264 3.55094C3.50079 3.38705 3.9244 3.37594 4.30687 3.52L6.02687 4.162ZM7.0002 3.832C7.0002 4.02608 7.05668 4.21596 7.16275 4.3785C7.26881 4.54103 7.41988 4.66918 7.59753 4.74733C7.85248 4.84168 8.13237 4.84404 8.38887 4.754C8.55541 4.68374 8.6998 4.56966 8.80668 4.42388C8.91355 4.2781 8.97892 4.10608 8.99582 3.92612C9.01272 3.74615 8.98052 3.56497 8.90266 3.40184C8.82479 3.23871 8.70416 3.09974 8.55361 2.99971C8.40305 2.89968 8.2282 2.84232 8.04764 2.83375C7.86709 2.82517 7.68758 2.8657 7.52822 2.95101C7.36887 3.03632 7.23561 3.16323 7.14263 3.31825C7.04966 3.47326 7.00043 3.65124 7.0002 3.832ZM7.2202 5.674L3.9582 4.45733C3.82018 4.40626 3.6677 4.4109 3.53303 4.47025C3.39836 4.5296 3.29206 4.63902 3.23663 4.77535C3.1812 4.91168 3.18098 5.06422 3.23602 5.20071C3.29106 5.3372 3.39704 5.44692 3.53153 5.50667L6.03487 6.60867C6.12364 6.64772 6.19914 6.71174 6.25217 6.79294C6.3052 6.87415 6.33347 6.96902 6.33353 7.066V9.556C6.33378 9.61155 6.32477 9.66675 6.30687 9.71933L5.02353 13.4333C4.97848 13.5691 4.9884 13.717 5.05117 13.8455C5.11394 13.974 5.22457 14.0728 5.35932 14.1207C5.49407 14.1686 5.64222 14.1617 5.772 14.1017C5.90178 14.0416 6.00285 13.9331 6.05353 13.7993L7.15353 10.7813C7.4422 9.99067 8.5602 9.99 8.84953 10.7813L9.95087 13.7967C9.97477 13.864 10.0117 13.9259 10.0595 13.979C10.1074 14.0321 10.1652 14.0752 10.2297 14.1059C10.2942 14.1366 10.3641 14.1543 10.4355 14.158C10.5068 14.1616 10.5782 14.1512 10.6455 14.1273C10.7129 14.1034 10.7748 14.0665 10.8279 14.0187C10.8809 13.9708 10.924 13.913 10.9547 13.8485C10.9854 13.784 11.0031 13.7141 11.0068 13.6427C11.0105 13.5714 11.0001 13.5 10.9762 13.4327L9.69353 9.71C9.67566 9.65741 9.66665 9.60221 9.66687 9.54667V7.062C9.66679 6.96464 9.69513 6.86938 9.74842 6.7879C9.80172 6.70642 9.87764 6.64228 9.96687 6.60333L12.3715 5.55667C12.5071 5.49631 12.614 5.38567 12.6696 5.24806C12.7252 5.11046 12.7252 4.95665 12.6696 4.81904C12.614 4.68142 12.5072 4.57076 12.3716 4.51038C12.2361 4.44999 12.0823 4.4446 11.9429 4.49533L8.7562 5.684C8.52287 5.77933 8.26753 5.832 7.99953 5.832C7.73156 5.8323 7.46694 5.77856 7.2202 5.674Z"
        fill="#A1A6B2"
      />
    </svg>
  );
};

export default PeersIcon;

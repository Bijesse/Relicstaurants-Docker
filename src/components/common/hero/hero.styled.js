//import hero from './../../../assets/images/hero.jpg';
import styled from 'styled-components';

export const HeroContainer = styled.div`
  height: calc(100vh - 150px - 80px);
  width: 100%;
`;
export const TriangleDiv = styled.div`
  width: 100%;
  padding-bottom: 21.27%;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 150%;
    height: 20%;
    background: ${({ theme: { color } }) => color.mainYellow};
    transform-origin: 0 100%;
    transform: rotate(-2deg);
  }
`;

export const StyledHero = styled.div`
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('https://deelaynr.onrender.com/4000/https://i.ibb.co/rvN8Y6j/hero.jpg');
`;

// Note from Developer: Removed line of code below from line 32 to experiment with absolute URL load times. 
// I also commented line 1 for this test
// Revert before production
// background-image: url(${hero});

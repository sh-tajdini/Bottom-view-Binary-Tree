import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TreeNode } from './App'



function App() {
const[ result, setResult ] = useState("");
const root: TreeNode = {
  data: 20,
  left: {
    data: 8,
    left: {
      data: 5,
      left: null,
      right: null,
    },
    right: {
      data: 3,
      left: {
        data: 10,
        left: null,
        right: null,
      },
      right: {
        data: 14,
        left: null,
        right: null,
      },
    },
  },
  right: {
    data: 22,
    left: null,
    right: {
      data: 25,
      left: null,
      right: null,
    },
  },
};
 const bottomView = (root:TreeNode)=> 
    {
        const res = [];
        if (root === null)
            return ;
    
        //initializing a variable 'hd' with 0 for the root element.
        let hd = 0;
    
        //TreeMap which stores key value pair sorted on key value.
        const m = new Map();
        const mh = new Map();
    
        //Queue to store tree nodes in level order traversal.
        const q = [];
        let start_q = 0;
    
        //assigning initialized horizontal distance value to 
        //root node and adding it to the queue.
        mh.set(root, hd);
        q.push(root);
    
        while (q.length !== start_q)
        {
            const temp:TreeNode = q[start_q];
            start_q++;
    
            //extracting the horizontal distance value from dequeued tree node.
            if(!mh.has(temp))
                mh.set(temp, 0);
            hd = mh.get(temp);
    
            //putting the dequeued tree node to TreeMap having key as  
            //horizontal distance. Every time we find a node having same
            //horizontal distance we need to replace the data in the map.
            m.set(hd, temp.data);
    
            //if the dequeued node has a left child, adding it to 
            //the queue with a horizontal distance hd-1.
            if (temp.left !== null)
            {
                mh.set(temp.left, hd-1);
                q.push(temp.left);
            }
            //if the dequeued node has a right child adding it to 
            //the queue with a horizontal distance hd+1.
            if (temp.right !== null)
            {
                mh.set(temp.right, hd+1);
                q.push(temp.right);
            }
        }
        
        const entri = m.entries();
        
        const list = [];
        
        for(const ele of entri)
            list.push(ele);
        
        //sorting the map elements according to horizontal distance.
        list.sort(function (a, b) {
                    if(a[0] == b[0])
                        return a[1] - b[1];
                    return a[0] - b[0];
                });
        
        //traversing the map elements and storing nodes in the list.
        for(let i=0; i<list.length; i++){
            res.push(list[i][1]);
        }
        //printing the output list. 
        setResult(res.toString());
    }
   
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() =>bottomView(root) }>
          count is {result}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

import React, { useState, useContext, useEffect } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
const data = [
    {
        label: 'parent',
        children: [
            {
                label: 'Child',
                children: [
                    {
                        label: 'childern1',
                        children: [
                            {
                                label: 'childern2 of 1',
                                children: [
                                    {
                                        label: 'childern3 of 2',
                                        children: [
                                            {
                                                label: 'childern4 of 3',
                                                children: [
                                                    {
                                                        label: 'childern5 of 4',
                                                    },
                                                    // {
                                                    //     label: 'childern6 of 5',
                                                    // },
                                                    {
                                                        label: 'childern7 of 6',
                                                        children: [
                                                            {
                                                                label: 'childern1 of 7',
                                                            },
                                                            {
                                                                label: 'childern2 of 7',
                                                                children: [
                                                                    {
                                                                        label: 'childern1 of 2',
                                                                    },
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        label: 'childern2',
                        children: [
                            {
                                label: 'childern 1',
                                children: [
                                    {
                                        label: 'childern2 of 1',
                                        children: [
                                            {
                                                label: 'childern1 of 2',
                                            },
                                            {
                                                label: 'childern2 of 2',
                                                children: [
                                                    {
                                                        label: 'childern1 of 2',
                                                        children: [
                                                            {
                                                                label: 'childern1 of 1',
                                                            },
                                                            {
                                                                label: 'childern2 of 1',
                                                                children: [
                                                                    {
                                                                        label: 'childern1 of 2',
                                                                    },
                                                                ]
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
const Autmationdemo = () => {
    // const [treeData, setTreeData] = useState([
    //     {
    //         id: 1,
    //         label: 'parent',
    //         children: [
    //             {
    //                 id: 2,
    //                 label: 'Child',
    //                 children: [
    //                     {
    //                         id: 3,
    //                         label: 'childern1',
    //                         children: [
    //                             {
    //                                 id: 4,
    //                                 label: 'childern2 of 1',
    //                                 children: [
    //                                     {
    //                                         id: 5,
    //                                         label: 'childern3 of 2',
    //                                         children: [
    //                                             {
    //                                                 id: 6,
    //                                                 label: 'childern4 of 3',
    //                                                 children: [
    //                                                     {
    //                                                         id: 7,
    //                                                         label: 'childern5 of 4',
    //                                                     },
    //                                                     {
    //                                                         id: 8,
    //                                                         label: 'childern7 of 6',
    //                                                         children: [
    //                                                             {
    //                                                                 id: 9,
    //                                                                 label: 'childern1 of 7',
    //                                                             },
    //                                                             {
    //                                                                 id: 10,
    //                                                                 label: 'childern2 of 7',
    //                                                                 children: [
    //                                                                     {
    //                                                                         id: 11,
    //                                                                         label: 'childern1 of 2',
    //                                                                     },
    //                                                                 ],
    //                                                             },
    //                                                         ],
    //                                                     },
    //                                                 ],
    //                                             },
    //                                         ],
    //                                     },
    //                                 ],
    //                             },
    //                         ],
    //                     },
    //                     {
    //                         id: 12,
    //                         label: 'childern2',
    //                         children: [
    //                             {
    //                                 id: 13,
    //                                 label: 'childern 1',
    //                                 children: [
    //                                     {
    //                                         id: 14,
    //                                         label: 'childern2 of 1',
    //                                         children: [
    //                                             {
    //                                                 id: 15,
    //                                                 label: 'childern1 of 2',
    //                                             },
    //                                             {
    //                                                 id: 16,
    //                                                 label: 'childern2 of 2',
    //                                                 children: [
    //                                                     {
    //                                                         id: 17,
    //                                                         label: 'childern1 of 2',
    //                                                         children: [
    //                                                             {
    //                                                                 id: 18,
    //                                                                 label: 'childern1 of 1',
    //                                                             },
    //                                                             {
    //                                                                 id: 19,
    //                                                                 label: 'childern2 of 1',
    //                                                                 children: [
    //                                                                     {
    //                                                                         id: 20,
    //                                                                         label: 'childern1 of 2',
    //                                                                     },
    //                                                                 ],
    //                                                             },
    //                                                         ],
    //                                                     },
    //                                                 ],
    //                                             },
    //                                         ],
    //                                     },
    //                                 ],
    //                             },
    //                         ],
    //                     },
    //                 ],
    //             },
    //         ],
    //     },
    // ]);
    const [treeData, setTreeData] = useState([
        // {
        //     id: 1,
        //     label: 'parent',
        //     children: [
        //         {
        //             id: 2,
        //             label: 'Child',
        //             children: [],
        //         },
        //         {
        //             id: 3,
        //             label: 'Child1',
        //             children: [],
        //         },
        //     ],
        // },
    ]);

    useEffect(() => {
        console.log(treeData, "check");
    }, [treeData]);


    // function generateTreeNodes(data) {
    //     return data.map((node, index) => (
    //         <TreeNode key={index} label={<div>{node.label}</div>}>
    //             {node.children && node.children.length > 0 && generateTreeNodes(node.children)}
    //         </TreeNode>
    //     ));
    // }
    function addspecificnode(nodeId) {
        setTreeData((prevTreeData) => {
            // Find the node in the treeData array using the nodeId
            const updatedTreeData = [...prevTreeData];

            const findNodeAndAddChild = (data) => {
                for (let i = 0; i < data.length; i++) {
                    const node = data[i];
                    if (node.id === nodeId) {
                        // Check if the child node already exists
                        const childExists = node.children.some(child => child.label === `Child of ${node.label}`);
                        if (!childExists) {
                            // Add a new child node to the found node
                            const newChildNode = {
                                id: Date.now(), // Generate a unique ID for the new child node
                                label: `Child of ${node.label}`,
                                children: []
                            };
                            node.children.push(newChildNode);
                        }
                        break; // Exit the loop once the node is found and the child is added
                    }
                    if (node.children && node.children.length > 0) {
                        findNodeAndAddChild(node.children);
                    }
                }
            };

            findNodeAndAddChild(updatedTreeData); // Call the recursive function to find the node and add the child

            return updatedTreeData; // Return the updated treeData
        });
    }
    function generateTreeNodes(data) {
        return data.map((node, index) => {
            const hasChildren = node.children && node.children.length > 0;

            return (
                <TreeNode key={index} label={<div>{node.label}</div>}>
                    {hasChildren ? generateTreeNodes(node.children) : (<TreeNode label={<div className="nodestyling" onClick={() => addspecificnode(node.id)}>+</div>} />)}
                </TreeNode>
            );
        });
    }

    return (
        // <Tree
        //     lineWidth={'4px'}
        //     lineColor={'#000'}
        //     lineBorderRadius={'10px'}
        //     label={<div className="treedataheader" > Add a start trigger </div>}
        // >
        //     <TreeNode label={<div>parent</div>}>
        //         <TreeNode label={<div> Child</div>} >
        //             <TreeNode label={<div >childern1</div>} >
        //                 <TreeNode label={<div >childern2 of 1</div>} >
        //                     <TreeNode label={<div >childern3 of 2</div>} >
        //                         <TreeNode label={<div >childern4 of 3</div>} >
        //                             <TreeNode label={<div >childern5 of 4</div>} >
        //                                 <TreeNode label={<div className='nodestyling'>+</div>} />
        //                             </TreeNode>
        //                             <TreeNode label={<div >childern6 of 5</div>} >
        //                                 <TreeNode label={<div >childern1 of 6</div>} >
        //                                     <TreeNode label={<div className='nodestyling'>+</div>} />
        //                                 </TreeNode>
        //                                 <TreeNode label={<div >childern2 of 6</div>} >
        //                                     <TreeNode label={<div >childern1 of 2</div>} >
        //                                         <TreeNode label={<div className='nodestyling'>+</div>} />
        //                                     </TreeNode>
        //                                 </TreeNode>
        //                             </TreeNode>
        //                         </TreeNode>
        //                     </TreeNode>
        //                 </TreeNode>
        //             </TreeNode>
        //             <TreeNode label={<div >childern2</div>} >
        //                 <TreeNode label={<div >childern 1</div>} >
        //                     <TreeNode label={<div >childern2 of 1</div>} >
        //                         <TreeNode label={<div >childern1 of 2</div>} >
        //                             <TreeNode label={<div className='nodestyling'>+</div>} />
        //                         </TreeNode>
        //                         <TreeNode label={<div >childern2 of 2</div>} >
        //                             <TreeNode label={<div >childern1 of 2</div>} >
        //                                 <TreeNode label={<div >childern1 of 1</div>} >
        //                                     <TreeNode label={<div className='nodestyling'>+</div>} />
        //                                 </TreeNode>
        //                                 <TreeNode label={<div >childern2 of 1</div>} >
        //                                     <TreeNode label={<div className='nodestyling'>+</div>} />
        //                                 </TreeNode>
        //                             </TreeNode>
        //                         </TreeNode>
        //                     </TreeNode>
        //                 </TreeNode>
        //             </TreeNode>
        //         </TreeNode>
        //     </TreeNode>
        // </Tree>
        <Tree
            lineWidth={'4px'}
            lineColor={'#000'}
            lineBorderRadius={'10px'}
            label={<div className="treedataheader" > Add a start trigger </div>}
        >
            <Tree lineWidth={'4px'} lineColor={'#000'} lineBorderRadius={'10px'}>
                {generateTreeNodes(treeData)}
            </Tree>
        </Tree>
    )
}
export default Autmationdemo